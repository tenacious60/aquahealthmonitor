-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  address TEXT,
  pincode TEXT,
  profile_image_url TEXT,
  language TEXT DEFAULT 'en',
  theme TEXT DEFAULT 'light',
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user settings table
CREATE TABLE public.user_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  emergency_contact TEXT,
  privacy_location BOOLEAN DEFAULT true,
  privacy_camera BOOLEAN DEFAULT true,
  notifications_enabled BOOLEAN DEFAULT true,
  auto_sync BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for alerts
CREATE POLICY "Users can view their own alerts" 
ON public.alerts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own alerts" 
ON public.alerts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts" 
ON public.alerts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts" 
ON public.alerts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for user_settings
CREATE POLICY "Users can view their own settings" 
ON public.user_settings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own settings" 
ON public.user_settings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" 
ON public.user_settings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings" 
ON public.user_settings 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name, public) VALUES ('profiles', 'profiles', true);

-- Create storage policies for profile images
CREATE POLICY "Profile images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload their own profile image" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'profiles' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own profile image" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'profiles' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile image" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'profiles' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
BEFORE UPDATE ON public.user_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, last_login_at)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    now()
  );
  
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  
  -- Create welcome alert
  INSERT INTO public.alerts (user_id, title, message, type)
  VALUES (
    NEW.id,
    'Welcome!',
    'Welcome to AquaHealth Monitor. Your account has been created successfully.',
    'success'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
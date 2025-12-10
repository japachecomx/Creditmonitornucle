/*
  # Create automatic user profile trigger
  
  1. Changes
    - Create a function that automatically creates a user profile when a new user signs up
    - Create a trigger that calls this function after a new user is inserted in auth.users
  
  2. Security
    - Function runs with SECURITY DEFINER to bypass RLS
    - Only creates profile if it doesn't already exist
    - Sets default role as Consultant with basic permissions
*/

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, role, permissions, active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'Consultant',
    '{"grant_credit": false, "request_insurance": false, "purchase_supplies": false}'::jsonb,
    true
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

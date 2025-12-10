/*
  # CreditMonitor Nucle Database Schema
  
  Complete database schema for agricultural credit and insurance management system.
  
  ## New Tables
  
  ### 1. clients
  - `id` (uuid, primary key)
  - `legal_name` (text) - Business/legal name
  - `tax_id` (text, unique) - RFC in Mexico
  - `email` (text)
  - `phone` (text)
  - `address` (text)
  - `status` (text) - Active, Inactive
  - `created_by` (uuid, foreign key to auth.users)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. credits
  - `id` (uuid, primary key)
  - `credit_number` (text, unique)
  - `client_id` (uuid, foreign key to clients)
  - `amount` (decimal)
  - `outstanding_balance` (decimal)
  - `interest_rate` (decimal)
  - `term_months` (integer)
  - `monthly_payment` (decimal)
  - `disbursement_date` (date)
  - `maturity_date` (date)
  - `next_payment_date` (date)
  - `payments_made` (integer)
  - `status` (text) - Active, Under Review, Late, Closed
  - `crop_type` (text)
  - `risk_score` (decimal)
  - `created_by` (uuid, foreign key to auth.users)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 3. insurance_policies
  - `id` (uuid, primary key)
  - `policy_number` (text, unique)
  - `client_id` (uuid, foreign key to clients)
  - `credit_id` (uuid, foreign key to credits, nullable)
  - `coverage_amount` (decimal)
  - `annual_premium` (decimal)
  - `premium_paid` (decimal)
  - `deductible_percentage` (decimal)
  - `policy_term_months` (integer)
  - `issue_date` (date)
  - `expiration_date` (date)
  - `status` (text) - Active, Pending, Processing Claim, Expired
  - `auto_renew` (boolean)
  - `created_by` (uuid, foreign key to auth.users)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 4. plots
  - `id` (uuid, primary key)
  - `plot_number` (text, unique)
  - `client_id` (uuid, foreign key to clients)
  - `credit_id` (uuid, foreign key to credits, nullable)
  - `location_description` (text)
  - `coordinates` (jsonb) - Store GPS coordinates
  - `area_hectares` (decimal)
  - `crop_type` (text)
  - `planting_date` (date)
  - `expected_harvest_date` (date)
  - `soil_type` (text)
  - `elevation_meters` (decimal)
  - `risk_score` (decimal)
  - `status` (text) - Active, Alert, Inactive
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 5. documents
  - `id` (uuid, primary key)
  - `document_id` (text, unique)
  - `client_id` (uuid, foreign key to clients)
  - `credit_id` (uuid, foreign key to credits, nullable)
  - `insurance_policy_id` (uuid, foreign key to insurance_policies, nullable)
  - `document_name` (text)
  - `document_type` (text) - ID, Tax Document, Compliance, Property Title, etc.
  - `file_url` (text) - URL to stored file
  - `file_size_bytes` (bigint)
  - `status` (text) - Verified, Pending Review, Expired
  - `uploaded_by` (uuid, foreign key to auth.users)
  - `verified_by` (uuid, foreign key to auth.users, nullable)
  - `verified_at` (timestamptz, nullable)
  - `created_at` (timestamptz)
  
  ### 6. products
  - `id` (uuid, primary key)
  - `product_code` (text, unique)
  - `name` (text)
  - `category` (text) - Herbicide, Fungicide, Insecticide, Fertilizer
  - `description` (text)
  - `brand` (text)
  - `price` (decimal)
  - `unit` (text) - L, kg, etc.
  - `stock_quantity` (integer)
  - `image_url` (text)
  - `active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 7. risk_assessments
  - `id` (uuid, primary key)
  - `plot_id` (uuid, foreign key to plots)
  - `assessment_date` (date)
  - `climate_risk_score` (decimal)
  - `agronomic_risk_score` (decimal)
  - `overall_risk_score` (decimal)
  - `factors` (jsonb) - Detailed risk factors
  - `recommendations` (text)
  - `assessed_by` (uuid, foreign key to auth.users)
  - `created_at` (timestamptz)
  
  ### 8. climate_events
  - `id` (uuid, primary key)
  - `event_type` (text) - Drought, Heavy Rain, Hail, High Temperature, etc.
  - `region` (text)
  - `severity` (text) - Low, Moderate, High
  - `start_date` (date)
  - `end_date` (date, nullable)
  - `plots_affected` (integer)
  - `description` (text)
  - `active` (boolean)
  - `created_at` (timestamptz)
  
  ### 9. insurance_claims
  - `id` (uuid, primary key)
  - `claim_number` (text, unique)
  - `insurance_policy_id` (uuid, foreign key to insurance_policies)
  - `claim_date` (date)
  - `claim_type` (text) - Drought, Hail, Flood, etc.
  - `claim_amount` (decimal)
  - `status` (text) - Submitted, Approved, Paid, Denied
  - `payment_date` (date, nullable)
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 10. field_notes
  - `id` (uuid, primary key)
  - `plot_id` (uuid, foreign key to plots)
  - `note_date` (date)
  - `technician_name` (text)
  - `notes` (text)
  - `created_by` (uuid, foreign key to auth.users)
  - `created_at` (timestamptz)
  
  ### 11. cart_items
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `product_id` (uuid, foreign key to products)
  - `quantity` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 12. orders
  - `id` (uuid, primary key)
  - `order_number` (text, unique)
  - `user_id` (uuid, foreign key to auth.users)
  - `client_id` (uuid, foreign key to clients, nullable)
  - `total_amount` (decimal)
  - `tax_amount` (decimal)
  - `status` (text) - Pending, Processing, Completed, Cancelled
  - `order_date` (timestamptz)
  - `created_at` (timestamptz)
  
  ### 13. order_items
  - `id` (uuid, primary key)
  - `order_id` (uuid, foreign key to orders)
  - `product_id` (uuid, foreign key to products)
  - `quantity` (integer)
  - `unit_price` (decimal)
  - `subtotal` (decimal)
  
  ### 14. user_profiles
  - `id` (uuid, primary key, foreign key to auth.users)
  - `full_name` (text)
  - `role` (text) - Administrator, Manager, Consultant
  - `permissions` (jsonb) - Permission flags
  - `active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Policies for authenticated users to manage their data
  - Policies for role-based access control
*/

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name text NOT NULL,
  tax_id text UNIQUE NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create credits table
CREATE TABLE IF NOT EXISTS credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  credit_number text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  amount decimal(15, 2) NOT NULL,
  outstanding_balance decimal(15, 2) NOT NULL,
  interest_rate decimal(5, 2) NOT NULL,
  term_months integer NOT NULL,
  monthly_payment decimal(15, 2) NOT NULL,
  disbursement_date date NOT NULL,
  maturity_date date NOT NULL,
  next_payment_date date,
  payments_made integer DEFAULT 0,
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Under Review', 'Late', 'Closed')),
  crop_type text,
  risk_score decimal(3, 1),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create insurance_policies table
CREATE TABLE IF NOT EXISTS insurance_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_number text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  credit_id uuid REFERENCES credits(id) ON DELETE SET NULL,
  coverage_amount decimal(15, 2) NOT NULL,
  annual_premium decimal(15, 2) NOT NULL,
  premium_paid decimal(15, 2) DEFAULT 0,
  deductible_percentage decimal(4, 2) NOT NULL,
  policy_term_months integer NOT NULL,
  issue_date date NOT NULL,
  expiration_date date NOT NULL,
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Pending', 'Processing Claim', 'Expired')),
  auto_renew boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create plots table
CREATE TABLE IF NOT EXISTS plots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plot_number text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  credit_id uuid REFERENCES credits(id) ON DELETE SET NULL,
  location_description text NOT NULL,
  coordinates jsonb,
  area_hectares decimal(10, 2) NOT NULL,
  crop_type text NOT NULL,
  planting_date date,
  expected_harvest_date date,
  soil_type text,
  elevation_meters decimal(10, 2),
  risk_score decimal(3, 1),
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Alert', 'Inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  credit_id uuid REFERENCES credits(id) ON DELETE CASCADE,
  insurance_policy_id uuid REFERENCES insurance_policies(id) ON DELETE CASCADE,
  document_name text NOT NULL,
  document_type text NOT NULL,
  file_url text NOT NULL,
  file_size_bytes bigint,
  status text NOT NULL DEFAULT 'Pending Review' CHECK (status IN ('Verified', 'Pending Review', 'Expired')),
  uploaded_by uuid REFERENCES auth.users(id),
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_code text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('Herbicide', 'Fungicide', 'Insecticide', 'Fertilizer')),
  description text,
  brand text NOT NULL,
  price decimal(10, 2) NOT NULL,
  unit text NOT NULL,
  stock_quantity integer NOT NULL DEFAULT 0,
  image_url text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create risk_assessments table
CREATE TABLE IF NOT EXISTS risk_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plot_id uuid REFERENCES plots(id) ON DELETE CASCADE NOT NULL,
  assessment_date date NOT NULL,
  climate_risk_score decimal(3, 1) NOT NULL,
  agronomic_risk_score decimal(3, 1) NOT NULL,
  overall_risk_score decimal(3, 1) NOT NULL,
  factors jsonb,
  recommendations text,
  assessed_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create climate_events table
CREATE TABLE IF NOT EXISTS climate_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  region text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('Low', 'Moderate', 'High')),
  start_date date NOT NULL,
  end_date date,
  plots_affected integer DEFAULT 0,
  description text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create insurance_claims table
CREATE TABLE IF NOT EXISTS insurance_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_number text UNIQUE NOT NULL,
  insurance_policy_id uuid REFERENCES insurance_policies(id) ON DELETE CASCADE NOT NULL,
  claim_date date NOT NULL,
  claim_type text NOT NULL,
  claim_amount decimal(15, 2) NOT NULL,
  status text NOT NULL DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Approved', 'Paid', 'Denied')),
  payment_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create field_notes table
CREATE TABLE IF NOT EXISTS field_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plot_id uuid REFERENCES plots(id) ON DELETE CASCADE NOT NULL,
  note_date date NOT NULL,
  technician_name text NOT NULL,
  notes text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  client_id uuid REFERENCES clients(id),
  total_amount decimal(15, 2) NOT NULL,
  tax_amount decimal(15, 2) NOT NULL,
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Completed', 'Cancelled')),
  order_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity integer NOT NULL,
  unit_price decimal(10, 2) NOT NULL,
  subtotal decimal(15, 2) NOT NULL
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'Consultant' CHECK (role IN ('Administrator', 'Manager', 'Consultant')),
  permissions jsonb DEFAULT '{"grant_credit": false, "request_insurance": false, "purchase_supplies": false}'::jsonb,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_tax_id ON clients(tax_id);
CREATE INDEX IF NOT EXISTS idx_credits_client_id ON credits(client_id);
CREATE INDEX IF NOT EXISTS idx_credits_status ON credits(status);
CREATE INDEX IF NOT EXISTS idx_insurance_policies_client_id ON insurance_policies(client_id);
CREATE INDEX IF NOT EXISTS idx_insurance_policies_credit_id ON insurance_policies(credit_id);
CREATE INDEX IF NOT EXISTS idx_plots_client_id ON plots(client_id);
CREATE INDEX IF NOT EXISTS idx_plots_credit_id ON plots(credit_id);
CREATE INDEX IF NOT EXISTS idx_documents_client_id ON documents(client_id);
CREATE INDEX IF NOT EXISTS idx_documents_credit_id ON documents(credit_id);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_plot_id ON risk_assessments(plot_id);
CREATE INDEX IF NOT EXISTS idx_field_notes_plot_id ON field_notes(plot_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Enable Row Level Security on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE climate_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clients
CREATE POLICY "Authenticated users can view clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for credits
CREATE POLICY "Authenticated users can view credits"
  ON credits FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create credits"
  ON credits FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update credits"
  ON credits FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for insurance_policies
CREATE POLICY "Authenticated users can view insurance policies"
  ON insurance_policies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create insurance policies"
  ON insurance_policies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update insurance policies"
  ON insurance_policies FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for plots
CREATE POLICY "Authenticated users can view plots"
  ON plots FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create plots"
  ON plots FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update plots"
  ON plots FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for documents
CREATE POLICY "Authenticated users can view documents"
  ON documents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can update documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for products
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO authenticated
  USING (active = true);

CREATE POLICY "Authenticated users can manage products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for risk_assessments
CREATE POLICY "Authenticated users can view risk assessments"
  ON risk_assessments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create risk assessments"
  ON risk_assessments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = assessed_by);

-- RLS Policies for climate_events
CREATE POLICY "Authenticated users can view climate events"
  ON climate_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage climate events"
  ON climate_events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for insurance_claims
CREATE POLICY "Authenticated users can view insurance claims"
  ON insurance_claims FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create insurance claims"
  ON insurance_claims FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update insurance claims"
  ON insurance_claims FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for field_notes
CREATE POLICY "Authenticated users can view field notes"
  ON field_notes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create field notes"
  ON field_notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- RLS Policies for cart_items
CREATE POLICY "Users can view their own cart items"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own cart items"
  ON cart_items FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for order_items
CREATE POLICY "Users can view order items for their orders"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Administrators can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'Administrator'
    )
  );

CREATE POLICY "Administrators can manage all profiles"
  ON user_profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'Administrator'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'Administrator'
    )
  );

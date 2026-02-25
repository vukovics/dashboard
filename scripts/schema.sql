-- Projects table schema for Supabase
-- Run this in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text NOT NULL CHECK (status IN ('active', 'on_hold', 'completed')),
  deadline date NOT NULL,
  assigned_to text NOT NULL,
  budget numeric(12,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (optional, for production)
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for development)
-- CREATE POLICY "Allow all access" ON projects FOR ALL USING (true);

-- Create an index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Create an index on name for faster searching
CREATE INDEX IF NOT EXISTS idx_projects_name ON projects(name);

-- Create a function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at on row update
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

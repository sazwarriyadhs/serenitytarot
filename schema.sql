-- Enable UUID generation if you want to use UUIDs for primary keys
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types for status fields to ensure data integrity
CREATE TYPE appointment_status AS ENUM ('Upcoming', 'Completed', 'Cancelled');
CREATE TYPE payment_status AS ENUM ('Paid', 'Pending');

-- Table for Tarot Masters (the service provider)
CREATE TABLE tarot_masters (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    specialties TEXT[],
    experience_years INTEGER
);

-- Table for Customers (clients)
CREATE TABLE customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    join_date DATE NOT NULL,
    avatar_url TEXT
);

-- Table for historical bookings/readings
CREATE TABLE booking_history (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    reading_type TEXT NOT NULL,
    notes TEXT
);

-- Table for available service offerings
CREATE TABLE service_offerings (
    id TEXT PRIMARY KEY,
    icon_name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    duration INTEGER NOT NULL -- in minutes
);

-- Table for appointments
CREATE TABLE appointments (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status appointment_status NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    total_duration INTEGER NOT NULL,
    payment_status payment_status NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table to link appointments with multiple services
CREATE TABLE appointment_services (
    appointment_id TEXT NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    service_offering_id TEXT NOT NULL REFERENCES service_offerings(id) ON DELETE RESTRICT,
    PRIMARY KEY (appointment_id, service_offering_id)
);

-- Table for Tarot Cards (static data)
CREATE TABLE tarot_cards (
    name_en TEXT PRIMARY KEY,
    name_id TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT
);

-- Optional: Trigger to update the 'updated_at' timestamp on appointments
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

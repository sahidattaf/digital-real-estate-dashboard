-- Properties Table: Stores all sales and rental listings
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT, -- 'residential', 'commercial', 'land', 'mixed'
  listing_type TEXT, -- 'sale', 'rent', 'both'
  phase TEXT, -- 'phase1', 'phase2', 'phase3'
  price_usd REAL,
  price_ang REAL,
  size_m2 REAL,
  bedrooms INTEGER,
  bathrooms REAL,
  location_lat REAL,
  location_lng REAL,
  address TEXT,
  status TEXT DEFAULT 'available', -- 'available', 'reserved', 'sold', 'rented'
  blockchain_token_id TEXT,
  blockchain_contract TEXT,
  images TEXT, -- JSON array of image URLs
  documents TEXT, -- JSON array of doc URLs
  amenities TEXT, -- JSON array
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Users Table: Extended for Web3 and KYC
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  wallet_address TEXT,
  role TEXT DEFAULT 'buyer', -- 'buyer', 'seller', 'agent', 'investor', 'admin'
  kyc_status TEXT DEFAULT 'pending',
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Transactions Table: Linking Fiat and Blockchain payments
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  property_id TEXT,
  buyer_id TEXT,
  seller_id TEXT,
  amount_usd REAL,
  blockchain_tx_hash TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
  payment_method TEXT, -- 'crypto', 'fiat', 'mixed'
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- Development Projects (Phase 2 & 3 specific data)
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT,
  phase TEXT,
  size_m2 REAL,
  budget_usd REAL,
  timeline_start INTEGER,
  timeline_end INTEGER,
  status TEXT,
  progress_percent REAL,
  location_data TEXT -- JSON
);

-- Chat Messages (for AI Assistant history)
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  message TEXT,
  response TEXT,
  context TEXT, -- JSON for RAG context provided
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- SEED DATA (Optional, for testing)
INSERT INTO properties (id, title, description, property_type, listing_type, price_usd, size_m2, location_lat, location_lng, address, images)
VALUES 
('prop_001', 'Luxury Oceanview Villa', 'Stunning 5-bedroom villa with panoramic views of the Caribbean Sea.', 'residential', 'sale', 1250000, 450, 12.123, -68.900, 'Vista Royal, Willemstad', '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop"]'),
('prop_002', 'Downtown Commercial Space', 'Prime retail location in Punda.', 'commercial', 'rent', 3500, 120, 12.105, -68.932, 'Punda, Willemstad', '["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"]');

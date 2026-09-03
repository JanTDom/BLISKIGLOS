-- =========================================================================
-- BAZA DANYCH BLISKIGŁOS (bliskiglos.pl)
-- Architektura opieki senioralnej, walidacji demencji i portalu rodziny
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Profile seniorów
CREATE TABLE IF NOT EXISTS senior_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Pani Maria',
  age INT DEFAULT 82,
  companion_name TEXT NOT NULL DEFAULT 'Pani Krystyna',
  companion_voice TEXT NOT NULL DEFAULT 'krystyna',
  font_size TEXT DEFAULT 'large',
  dementia_stage TEXT DEFAULT 'mild',
  favorite_topics JSONB DEFAULT '["Młodość", "Ogród", "Piosenki Santor i Fogga", "Dawne przepisy"]'::jsonb,
  special_notes TEXT DEFAULT 'Tęskni za rodzinnym domem w Wilnie, potrzebuje ciepła i spokoju',
  guardian_email TEXT,
  guardian_phone TEXT,
  subscription_tier TEXT DEFAULT 'family_peace',
  subscription_active BOOLEAN DEFAULT TRUE,
  streak_days INT DEFAULT 8,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Historia rozmów seniora z agentem
CREATE TABLE IF NOT EXISTS senior_messages (
  id TEXT PRIMARY KEY,
  senior_id TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('senior', 'companion')),
  text TEXT NOT NULL,
  mood_context TEXT,
  crisis_flag BOOLEAN DEFAULT FALSE,
  crisis_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Kronika wspomnień (Terapia Reminiscencyjna)
CREATE TABLE IF NOT EXISTS reminiscence_stories (
  id TEXT PRIMARY KEY,
  senior_id TEXT NOT NULL,
  title TEXT NOT NULL,
  story TEXT NOT NULL,
  decade_or_era TEXT,
  emotion TEXT,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Raporty dzienne dla rodziny i opiekunów
CREATE TABLE IF NOT EXISTS family_reports (
  id TEXT PRIMARY KEY,
  senior_id TEXT NOT NULL,
  report_date DATE DEFAULT CURRENT_DATE,
  duration_minutes INT DEFAULT 0,
  mood_summary TEXT NOT NULL,
  emotional_state TEXT NOT NULL,
  key_stories JSONB DEFAULT '[]'::jsonb,
  health_notices JSONB DEFAULT '[]'::jsonb,
  guardian_tip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Włączenie Row Level Security
ALTER TABLE senior_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE senior_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminiscence_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_reports ENABLE ROW LEVEL SECURITY;

-- Polityki dostępu
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public access senior_profiles') THEN
    CREATE POLICY 'Allow public access senior_profiles' ON senior_profiles FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public access senior_messages') THEN
    CREATE POLICY 'Allow public access senior_messages' ON senior_messages FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public access reminiscence_stories') THEN
    CREATE POLICY 'Allow public access reminiscence_stories' ON reminiscence_stories FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public access family_reports') THEN
    CREATE POLICY 'Allow public access family_reports' ON family_reports FOR ALL USING (true) WITH CHECK (true);
  END IF;
END
$$;

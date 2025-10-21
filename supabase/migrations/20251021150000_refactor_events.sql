
ALTER TABLE events
  DROP COLUMN IF EXISTS hosting_venue_detail,
  DROP COLUMN IF EXISTS scheduled_at;

ALTER TABLE events
  ALTER COLUMN hosting_prefecture TYPE CHAR(10),
  ALTER COLUMN hosting_prefecture SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_event_prefecture
  ON events(hosting_prefecture);

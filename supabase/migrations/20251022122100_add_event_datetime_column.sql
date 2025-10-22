ALTER TABLE events
ADD COLUMN event_datetime timestamptz NOT NULL;

COMMENT ON COLUMN events.event_datetime IS '大会の開催日時（昼大会・夜大会を区別する）';

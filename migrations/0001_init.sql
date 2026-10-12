-- Reads, likes and comments for blog posts.

CREATE TABLE IF NOT EXISTS post_views (
  slug  TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0
);

-- one row per reader per post; the voter is a salted hash, never a raw IP
CREATE TABLE IF NOT EXISTS post_likes (
  slug       TEXT NOT NULL,
  voter      TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (slug, voter)
);

CREATE TABLE IF NOT EXISTS comments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  slug       TEXT NOT NULL,
  parent_id  INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  body       TEXT NOT NULL,
  is_author  INTEGER NOT NULL DEFAULT 0,
  voter      TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_comments_slug ON comments (slug, created_at);
CREATE INDEX IF NOT EXISTS idx_comments_voter ON comments (voter, created_at);

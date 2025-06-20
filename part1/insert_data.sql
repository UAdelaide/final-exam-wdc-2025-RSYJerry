INSERT INTO Users (username, email, password_hash, role) VALUES
  ('alice123', 'alice@example.com', 'hashed123', 'owner'),
  ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
  ('carol123', 'carol@example.com', 'hashed789', 'owner'),
  ('davidowner', 'david@example.com', 'hashed111', 'owner'),
  ('elliewalker', 'ellie@example.com', 'hashed222', 'walker');

INSERT INTO Dogs (owner_id, name, size) VALUES
  ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
  ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
  ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Rocky', 'large'),
  ((SELECT user_id FROM Users WHERE username = 'davidowner'), 'Buddy', 'medium'),
  ((SELECT user_id FROM Users WHERE username = 'davidowner'), 'Lucy', 'small');

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
  ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
  ((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
  ((SELECT dog_id FROM Dogs WHERE name = 'Rocky'), '2025-06-11 10:00:00', 60, 'Downtown Park', 'open'),
  ((SELECT dog_id FROM Dogs WHERE name = 'Buddy'), '2025-06-12 14:00:00', 40, 'Riverside Walk', 'open'),
  ((SELECT dog_id FROM Dogs WHERE name = 'Lucy'), '2025-06-13 07:30:00', 20, 'City Garden', 'open');
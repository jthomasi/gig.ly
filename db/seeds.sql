

USE gigly_db;


INSERT INTO admins (name, email, cellphone, password, createdAt, updatedAt)
values 

("Jim Smith", "test@example.com", "5125551212", "12345678", NOW(), NOW()),
("LaDainian Tomlinson", "test2@example.com", "5125555555", "tcuhornedfrogs", NOW(), NOW()),
("Alexander Hamilton", "test21@example.com", "5123342787", "iamalexander", NOW(), NOW()),
("Bob Barker", "test18@example.com", "5127481414", "spayorneuter", NOW(), NOW()),
("Henry Stuart", "test8@example.com", "5128888888", "offwithyourhead", NOW(), NOW());




INSERT INTO events 


SET name = "Lassie's Party",
start: ,
duration = "4",
location = "Timmy's House",
details = "this is the description"
createdAt = NOW(),
updatedAt = NOW(),
AdminId =  (SELECT id FROM admins
  WHERE id = 1);
  
--   INSERT INTO events 


-- SET name = "Fright Fest",
-- location = "Hangman's House of Horrors",
-- event_date = '2017-06-01',
-- createdAt = NOW(),
-- updatedAt = NOW(),
-- AdminId =  (SELECT id FROM admins
--   WHERE id = 2);
  
  
--     INSERT INTO events 


-- SET name = "Joe and Jane's Wedding",
-- location = "Mt. Bonnel",
-- event_date = '2017-06-15',
-- createdAt = NOW(),
-- updatedAt = NOW(),
-- AdminId =  (SELECT id FROM admins
--   WHERE id = 3);
  
  
  
  
-- INSERT INTO events 


-- SET name = "Kite Festival",
-- location = "Zilker Park",
-- event_date = '2017-06-12',
-- createdAt = NOW(),
-- updatedAt = NOW(),
-- AdminId =  (SELECT id FROM admins
--   WHERE id = 4);
    
  
  
  
INSERT INTO workers (name, email, cellphone, password, createdAt, updatedAt)
values 

("Billy Jones", "test99@example.com", "5123456789", "asdfqwer", NOW(), NOW()),
("Ty Shover", "test2222@example.com", "5127463528", "qwertyuiop", NOW(), NOW()),
("Sean Gallagher", "test44@example.com", "5127774343", "jfjfjfjffff", NOW(), NOW()),
("Dorothy Gray", "test7575@example.com", "5128887474", "gggggghhhhhhh", NOW(), NOW()),
("Cheryl Posey", "test1166@example.com", "5126663333", "ooooooooops", NOW(), NOW());


 


INSERT INTO jobs 
   SET title = "Bartender",
   description = "Tend bar for 300-person event. Flat rate plus tips",
   start = "8:00", 
   end = "11:59", 
  createdAt =  NOW(), 
  updatedAt = NOW(),
  EventId = (SELECT id FROM events
  WHERE id = 2),
  WorkerId = (select id FROM workers
  WHERE id = 1);
  


INSERT INTO jobs 
   SET title = "clown",
   description = "Entertain kids at a birthday party",
   start = "8:00", 
   end = "10:00", 
  createdAt =  NOW(), 
  updatedAt = NOW(),
  EventId = (SELECT id FROM events
  WHERE id = 1),
  WorkerId = (select id FROM workers
  WHERE id = 2);
  
INSERT INTO jobs 
   SET title = "dj",
   description = "spin tunes",
   start = "7:00", 
   end = "11:59", 
  createdAt =  NOW(), 
  updatedAt = NOW(),
  EventId = (SELECT id FROM events
  WHERE id = 2),
  WorkerId = (select id FROM workers
  WHERE id = 3);
  
  
  INSERT INTO jobs
  SET title = "bartender",
  description = "beer and wine bar",
  start = "11:00",
  end = "3:00",
  createdAt =  NOW(), 
  updatedAt = NOW(),
  EventId = (SELECT id FROM events
  WHERE id = 3),
  WorkerId = (select id FROM workers
  WHERE id = 4);  
  
INSERT INTO jobs 
   SET title = "cleanup crew",
   description = "keep the park clean",
   start = "7:00", 
   end = "11:59", 
  createdAt =  NOW(), 
  updatedAt = NOW(),
  EventId = (SELECT id FROM events
  WHERE id = 4),
  WorkerId = (select id FROM workers
  WHERE id = 1);
  



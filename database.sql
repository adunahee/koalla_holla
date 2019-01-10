--creates koallas table
CREATE TABLE "koallas" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(40) not null,
    "gender" varchar(1) not null,
    "age" INTEGER,
    "ready_to_transfer" BOOLEAN,
    "notes" TEXT
);

--adds sample koallas, true in ready_to_transfer means yes they are
INSERT INTO "koallas" ("name", "gender", "age", "ready_to_transfer", "notes") 
    VALUES ('Scotty', 'M', 4, true, 'Born in Guatemala'),
           ('Jean', 'F', 5, true, 'Allergic to lots of lava'),
           ('Ororo', 'F', 7, false, 'Loves listening to Paula Abdul'),
           ('Logan', 'M', 15, false, 'Loves the sauna'),
           ('Charlie', 'M', 9, true, 'Favorite band is Nirvana'),
           ('Betsy', 'F', 4, true, 'Has a pet iguana');

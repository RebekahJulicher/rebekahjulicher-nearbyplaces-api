CREATE table mynearbyplaces.place (
	id bigint not NULL GENERATED ALWAYS AS IDENTITY,
	city text not NULL,
	state text not NULL,
	category text not NULL,
	name text not null,
	CONSTRAINT place_pk PRIMARY KEY (id)
);


CREATE TABLE mynearbyplaces.review (
	id bigint not NULL GENERATED ALWAYS AS IDENTITY,
	content text not NULL,	
	rating int NULL,
	username text not NULL,
	placeid bigint not null,
	CONSTRAINT review_pk PRIMARY KEY (id),
	CONSTRAINT review_fk FOREIGN KEY (placeid) REFERENCES mynearbyplaces.place(id)
);
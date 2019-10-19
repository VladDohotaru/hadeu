CREATE TABLE biblioteca_db.Activity (
	ActivityId int,
	ActivityName varchar(255)
);

CREATE TABLE biblioteca_db.First (
	KeyId int,
	Tip varchar(255),
	Filiala varchar(255),
	Activ int,
	NrParitici int
);

CREATE TABLE biblioteca_db.Second (
	KeyId int,
	Filiala varchar(255),
	NrLivrate int,
	NrServicii16 int,
	NrTotalFormal int,
	NrTotalNFormal int,
	NrTotalIFormal int,
	NrTotalUseri int,
	NrTotalCopii int,
	NrPartIFormal int,
	NrPartICopii int
);
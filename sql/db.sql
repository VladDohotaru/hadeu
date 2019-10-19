CREATE TABLE biblioteca_db.Activity (
	ActivityId int,
	ActivityType ENUM ('Stiintifice', 'Culturale'),
	ActivityFormat ENUM ('Conferinta', 'Simpozion', 'Lectie publica', 'Masa rotunda', 'Colocviu'),
	ActivityDate DATE,
	ActivityLocation varchar(255),
	ActivityNrLocuri int,
	ActivityNrLOcuriLibere int,
	ActivityDescriere varchar(65000),
	ActivityAudienta ENUM ('Copii', 'Tineri', 'Adulti', 'Seniori'),
	ActivityTopic ENUM ('Teatru', 'Muzica', 'Dans'),
	ActivityLimba ENUM ('Rusa', 'Romana', 'Engleza')
);

CREATE TABLE biblioteca_db.Programe (
	ProgrameNume varchar(255),
	ProgrameId int,
	ProgramePublicatiiId int
);

CREATE TABLE biblioteca_db.Publicatii (
	PublicatiiId int,
	PublicatiiNume varchar(255),
	PublicatiiAutor varchar(255),
	PublicatiiCategorie ENUM ('Stiintific', 'Cultural', 'Educativ')
);

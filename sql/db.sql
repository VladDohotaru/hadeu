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
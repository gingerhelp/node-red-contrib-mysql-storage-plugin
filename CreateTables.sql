CREATE TABLE `NodeRedCredentials` (
  `CredentialID` int(11) NOT NULL AUTO_INCREMENT,
  `JsonData` longtext DEFAULT NULL,
  PRIMARY KEY (`CredentialID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
GO;
CREATE TABLE `NodeRedFlows` (
  `FlowID` int(11) NOT NULL AUTO_INCREMENT,
  `JsonData` longtext NOT NULL,
  PRIMARY KEY (`FlowID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
GO;
CREATE TABLE `NodeRedLibrary` (
  `LibraryID` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(10) DEFAULT NULL,
  `Path` longtext DEFAULT NULL,
  `Meta` longtext DEFAULT NULL,
  `JsonData` longtext DEFAULT NULL,
  PRIMARY KEY (`LibraryID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
GO;
CREATE TABLE `NodeRedSessions` (
  `SessionID` int(11) NOT NULL AUTO_INCREMENT,
  `JsonData` longtext DEFAULT NULL,
  PRIMARY KEY (`SessionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
GO;
CREATE TABLE `NodeRedSettings` (
  `SettingID` int(11) NOT NULL AUTO_INCREMENT,
  `JsonData` longtext DEFAULT NULL,
  PRIMARY KEY (`SettingID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
GO;
CREATE DATABASE socka;

CREATE TABLE players (
    `id` int(5) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `position` varchar(255) NOT NULL,
    `number` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `user_name` bigint(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

drop table players;

show tables;

describe players;
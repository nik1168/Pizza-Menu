USE `pizza` ;
INSERT INTO `topping` (`id`,`name`) VALUES (1,'Ham');
INSERT INTO `topping` (`id`,`name`) VALUES (2,'Pineapple');
INSERT INTO `topping` (`id`,`name`) VALUES (3,'Peperoni');
INSERT INTO `topping` (`id`,`name`) VALUES (4,'Cabbage');
INSERT INTO `topping` (`id`,`name`) VALUES (5,'Potatoes');
INSERT INTO `topping` (`id`,`name`) VALUES (6,'Tomatoes');
INSERT INTO `topping` (`id`,`name`) VALUES (7,'Chile');
INSERT INTO `topping` (`id`,`name`) VALUES (8,'Mozarella');

INSERT INTO `pizza` (`id`,`name`) VALUES (1,'Hawaiian');
INSERT INTO `pizza` (`id`,`name`) VALUES (2,'Peperoni');
INSERT INTO `pizza` (`id`,`name`) VALUES (3,'Irish');

INSERT INTO `pizza_has_topping` (`pizza_id`,`topping_id`) VALUES (1,1);
INSERT INTO `pizza_has_topping` (`pizza_id`,`topping_id`) VALUES (1,2);
INSERT INTO `pizza_has_topping` (`pizza_id`,`topping_id`) VALUES (2,3);
INSERT INTO `pizza_has_topping` (`pizza_id`,`topping_id`) VALUES (3,4);
INSERT INTO `pizza_has_topping` (`pizza_id`,`topping_id`) VALUES (3,5);

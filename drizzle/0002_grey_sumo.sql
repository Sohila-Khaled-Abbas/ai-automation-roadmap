CREATE TABLE `learnerSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`submissionType` enum('project','resource') NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`url` varchar(1024),
	`moduleId` varchar(64),
	`status` enum('pending','reviewed','accepted','declined') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `learnerSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `learnerSubmissions` ADD CONSTRAINT `learnerSubmissions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;
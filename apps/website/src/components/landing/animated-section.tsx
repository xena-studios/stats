"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			staggerChildren: 0.1,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

export function AnimatedSection({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-80px" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function AnimatedItem({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<motion.div variants={itemVariants} className={className}>
			{children}
		</motion.div>
	);
}

export function AnimatedText({
	children,
	className,
	as: Component = "p",
}: {
	children: ReactNode;
	className?: string;
	as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
}) {
	if (Component === "h1") {
		return (
			<motion.h1 variants={itemVariants} className={className}>
				{children}
			</motion.h1>
		);
	}
	if (Component === "h2") {
		return (
			<motion.h2 variants={itemVariants} className={className}>
				{children}
			</motion.h2>
		);
	}
	if (Component === "h3") {
		return (
			<motion.h3 variants={itemVariants} className={className}>
				{children}
			</motion.h3>
		);
	}
	if (Component === "span") {
		return (
			<motion.span variants={itemVariants} className={className}>
				{children}
			</motion.span>
		);
	}
	if (Component === "div") {
		return (
			<motion.div variants={itemVariants} className={className}>
				{children}
			</motion.div>
		);
	}

	return (
		<motion.p variants={itemVariants} className={className}>
			{children}
		</motion.p>
	);
}

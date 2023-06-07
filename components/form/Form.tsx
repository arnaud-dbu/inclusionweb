"use client";

import React, { FC, createElement } from "react";
import { ReactNode } from "react";

export type classNameType = string;
export type childrenType = ReactNode;

export interface IFormProps {
	defaultValues?: any;
	children?: childrenType;
	btnLabel?: string;
	onSubmit?: any;
	handleSubmit?: any;
	register?: any;
	className?: classNameType;
}

const Form: FC<IFormProps> = ({
	defaultValues,
	btnLabel,
	children,
	className,
	onSubmit,
	handleSubmit,
	register,
	...rest
}) => {
	return (
		<form onSubmit={handleSubmit(onSubmit)} {...rest}>
			<div className={` ${className}`}>
				{Array.isArray(children)
					? children.map((child) => {
							return child.props?.name
								? createElement(child.type, {
										...{
											...child.props,
											register,
											key: child.props.name,
										},
								  })
								: child;
					  })
					: children}
			</div>
		</form>
	);
};

export default Form;

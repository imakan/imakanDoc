type key = "vue" | "react";

type MappedType = { [k in key]: string };

type framework = ["vue", "react", "angular"];

type ElementOfs<T extends any[]> = T extends Array<infer E> ? E : never;

type frameworkVal1 = ElementOfs<framework>; // "vue" | "react" | "angular"

type frameworkVal2 = framework[any];

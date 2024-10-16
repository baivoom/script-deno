import * as toml from "jsr:@std/toml";
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

const CargoSchema = z.object({
    workspace: z.object({
        members: z.array(z.string()), // List of members (projects) in the workspace
        exclude: z.array(z.string()).optional(), // Optional exclude list
        dependencies: z.record(
            z.union([
                z.string(),
                z.object({
                    version: z.string().optional(),
                    optional: z.boolean().optional(),
                    default_features: z.boolean().optional(),
                    features: z.array(z.string()).optional(),
                    path: z.string().optional(),
                    git: z.string().optional(),
                    branch: z.string().optional(),
                    tag: z.string().optional(),
                    rev: z.string().optional(),
                }),
            ]),
        ).optional(),
    }).optional(),

    package: z.object({
        name: z.string(),
        version: z.string(),
        edition: z.string().optional(),
        description: z.string().optional(),
        authors: z.array(z.string()).optional(),
        license: z.string().optional(),
        repository: z.string().optional(),
        documentation: z.string().optional(),
        homepage: z.string().optional(),
        autobins: z.boolean().optional(),
        autoexamples: z.boolean().optional(),
        autotests: z.boolean().optional(),
        autobenches: z.boolean().optional(),
        build: z.string().optional(),
    }).optional(),

    dependencies: z.record(
        z.union([
            z.string(), // For simple version strings
            z.object({
                version: z.string().optional(),
                optional: z.boolean().optional(),
                default_features: z.boolean().optional(),
                features: z.array(z.string()).optional(),
                path: z.string().optional(),
                git: z.string().optional(),
                branch: z.string().optional(),
                tag: z.string().optional(),
                rev: z.string().optional(),
            }),
        ]),
    ).optional(),

    devDependencies: z.record(
        z.union([
            z.string(), // For simple version strings
            z.object({
                version: z.string().optional(),
                optional: z.boolean().optional(),
                default_features: z.boolean().optional(),
                features: z.array(z.string()).optional(),
                path: z.string().optional(),
                git: z.string().optional(),
                branch: z.string().optional(),
                tag: z.string().optional(),
                rev: z.string().optional(),
            }),
        ]),
    ).optional(),

    buildDependencies: z.record(
        z.union([
            z.string(), // For simple version strings
            z.object({
                version: z.string().optional(),
                optional: z.boolean().optional(),
                default_features: z.boolean().optional(),
                features: z.array(z.string()).optional(),
                path: z.string().optional(),
                git: z.string().optional(),
                branch: z.string().optional(),
                tag: z.string().optional(),
                rev: z.string().optional(),
            }),
        ]),
    ).optional(),

    features: z.record(z.array(z.string())).optional(),

    bin: z.array(
        z.object({
            name: z.string(),
            path: z.string().optional(),
            required_features: z.array(z.string()).optional(),
        }),
    ).optional(),

    lib: z.object({
        name: z.string().optional(),
        path: z.string().optional(),
        crate_type: z.array(z.string()).optional(),
    }).optional(),
});

export type CargoSchemaType = z.infer<typeof CargoSchema>;

export class Cargo {
    static parse(input: string): CargoSchemaType {
        return CargoSchema.parse(toml.parse(input));
    }
}

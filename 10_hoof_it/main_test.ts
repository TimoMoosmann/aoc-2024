import { assertEquals } from "@std/assert";
import { solveA } from "./main.ts";

Deno
    .test(
        async function solveATest() {
            const result = await solveA(
                {
                    isTest: true,
                },
            );

            assertEquals(
                result,
                36,
            );
        },
    );

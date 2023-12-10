
// Copyright 2023 Im-Beast. MIT license.
import { crayon } from "https://deno.land/x/crayon@3.3.3/mod.ts";
import { Tui } from "https://deno.land/x/tui@2.1.6/mod.ts";
import { Text } from "https://deno.land/x/tui@2.1.6/src/components/mod.ts";

const tui = new Tui({
    style: crayon.bgBlack,
    refreshRate: 1000 / 60
});

tui.dispatch();
tui.run();

new Text({
    parent: tui,
    text: "Hello there",
    theme: {
        base: crayon.magenta,
    },
    rectangle: {
        column: 1,
        row: 1,
    },
    zIndex: 0,
});


new Text({
    parent: tui,
    text: "These libs suckkkk",
    theme: {
        base: crayon.magenta,
    },
    rectangle: {
        column: 2,
        row: 1,
    },
    zIndex: 0,
});
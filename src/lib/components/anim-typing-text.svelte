<script lang="ts">
    let {
        text = "text",
        disabled = false,
        duration = 200,
        initial = 0,
        repeat = $bindable(false),
        playForwardOnLoad = undefined,
        onPlayEnd = undefined
    }: {
        text?: string,
        disabled?: boolean,
        duration?: number,
        initial?: number,
        repeat?: boolean,
        playForwardOnLoad?: boolean | undefined,
        onPlayEnd?: Function | undefined
    } = $props();

    let the_text = text;
    text = "";
    let anim_reverse = false;
    let progress: number;

    const ongoingIntervals: Array<number | NodeJS.Timeout> = [];

    export function setPlayEndCallback(func: Function | undefined) {
        onPlayEnd = func;
    }

    export function setText(str: string) {
        the_text = str;
    }

    export function setRepeat(b: boolean) {
        repeat = b;
    }

    export function reset() {
        clearIntervalEvents();

        if (disabled) {
            text = the_text;
            return;
        }

        progress = initial;
        updateText();
    }

    function clearIntervalEvents() {
        let item: number | NodeJS.Timeout | undefined;

        while ((item = ongoingIntervals.pop()) != undefined) {
            clearInterval(item);
        }
    }

    function updateText() {
        text = the_text.slice(0, Math.min(Math.max(progress, 0), the_text.length));
    }

    export function startTextAnimation(reverse: boolean = false) {
        if (disabled) {
            text = the_text;
            return;
        }

        const start = Date.now();
        const durationMS = duration;
        const durationEach = durationMS / the_text.length;

        anim_reverse = reverse;

        clearIntervalEvents();

        const key = setInterval(() => {
            const now = Date.now();
            const delta = now - start;

            if (delta > durationMS) {
                progress = anim_reverse ? 0 : the_text.length;
                clearIntervalEvents();

                updateText();
                try{
                    if(onPlayEnd?.() === false)
                    {
                        console.log("stop playback and throwing callback because onPlayEnd returned false.");
                        onPlayEnd = undefined;
                        return;
                    }
                }
                catch (e){
                    console.error(e);
                    clearIntervalEvents();
                }

                if (repeat) {
                    reset();
                    requestAnimationFrame(() => startTextAnimation(reverse));
                }
            } else {
                progress = progress + (anim_reverse ? -1 : 1);
                updateText();
            }
        }, durationEach);
        ongoingIntervals.push(key);
    }

    reset();

    if (playForwardOnLoad !== undefined)
        startTextAnimation(!playForwardOnLoad);
</script>

<span>{text}</span>
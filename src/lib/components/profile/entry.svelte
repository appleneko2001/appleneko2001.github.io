<script lang="ts">
    import "$lib/themes/theming.css";

    // icon provider: simple-icons
    let {
        icon,
        text = "text",
        href,
        expanded = false,
        focused = false,
        hint = text
    }: {
        icon?: any,
        text?: string,
        href?: string,
        expanded?: boolean,
        focused?: boolean,
        hint?: string | null
    } = $props();

    const the_text = text;
    text = "";

    const ongoingTimeouts: number[] = [];
    const ongoingIntervals: number[] = [];

    function onPointerOver(){
        const key = setTimeout(() => {
            focused = true;
            let item : number | undefined;
            while ((item = ongoingTimeouts.pop()) != undefined){
                clearTimeout(item);
            }
        }, 50);
        ongoingTimeouts.push(key);

        startTextAnimation();
    }

    function onPointerLeave(){
        let item : number | undefined;
        while ((item = ongoingTimeouts.pop()) != undefined){
            clearTimeout(item);
        }
        focused = false;

        startTextAnimation(true);
    }

    function onClick(e : UIEvent){
        if(!focused && expanded !== true)
            e.preventDefault();
    }

    let anim_reverse = false;
    let progress : number = 0;

    startTextAnimation(true);

    function startTextAnimation(reverse: boolean = false){
        if(expanded)
        {
            text = the_text;
            return;
        }

        const start = Date.now();
        const durationMS = 100;
        const durationEach = durationMS / the_text.length;

        anim_reverse = reverse;

        let item : number | undefined;
        while ((item = ongoingIntervals.pop()) != undefined){
            clearInterval(item);
        }

        const key = setInterval(() => {
            const now = Date.now();
            const delta = now - start;

            if(delta > durationMS)
            {
                progress = anim_reverse ? 0 : the_text.length;

                let item : number | undefined;
                while ((item = ongoingIntervals.pop()) != undefined){
                    clearInterval(item);
                }
            }
            else
            {
                progress = progress + (anim_reverse ? -1 : 1);
            }

            text = the_text.slice(0, Math.min(Math.max(progress, 0), the_text.length));
        }, durationEach);
        ongoingIntervals.push(key);
    }

</script>

<a class="profile-button"
   class:expanded={expanded}
   class:focused={focused}
   title={hint}
   href={href}
   onfocusin={onPointerOver}
   onfocusout={onPointerLeave}
   onmouseenter={onPointerOver}
   onmouseleave={onPointerLeave}
   onclick={onClick}>
    <!-- {@render icon?.()} -->
    {#if icon}
        <div class="icon"
             style="mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/{icon}.svg)"></div>
    {/if}

    <span class="text">
        <span>{text}</span>
    </span>
</a>

<style>
    a {
        text-decoration: none;
        color: var(--foreground-colour);
    }

    .profile-button {
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        padding: 8px;
        align-items: center;

        border: transparent 2px solid;
        border-radius: 8px;
        transition: all 0.25s linear;
    }

    .profile-button > .icon {
        width: 32px;
        height: 32px;
        background: var(--foreground-colour);
        mask-size: cover;
    }

    .profile-button > .text {
        overflow: hidden;
        white-space: nowrap;
        font-size: 1.2em;
    }

    .profile-button > .text > span {
        margin-left: 8px;
    }

    .profile-button.focused {
        border: var(--foreground-colour) 2px solid;
    }
</style>
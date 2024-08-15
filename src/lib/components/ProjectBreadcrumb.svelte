<script lang="ts">
    export let name: string;
</script>

<nav aria-label="Breadcrumb">
    <ol
        role="list"
        class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-5xl lg:px-8"
    >
        <li>
            <div class="flex items-center">
                <a
                    href="/#projects"
                    class="mr-2 text-sm font-medium text-neutral-900 hover:text-neutral-800 dark:text-neutral-100"
                    >projects</a
                >
                <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="h-5 w-4 text-neutral-300"
                >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
            </div>
        </li>

        <li class="text-sm">
            <div
                class="font-medium text-neutral-500 dark:text-neutral-400 "
                >{name}</div
            >
        </li>
    </ol>
</nav>
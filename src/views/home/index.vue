<template>
    <div>
        <button v-tooltip="'Simple tooltip'">Hover me</button>
        <!-- or with config -->
        <button v-tooltip="{ content: 'Custom tooltip', config: { placement: 'bottom' } }">
            Hover me
        </button>
        {{ $t('message.hello') }}
    </div>
</template>

<template>
    <div class="modal">
        <div class="overlay" @click="$emit('close-modal')"></div>
        <div class="modal-card">
            <slot />
        </div>
    </div>
</template>

<style>
.modal, .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
}

.overlay {
    opacity: 0.5;
    background-color: black;
}

.modal-card {
    position: relative;
    max-width: 70%;
    margin: auto;
    margin-top: 100px;
    padding: 20px;
    background-color: white;
    max-height: 80%;
    z-index: 10;
    opacity: 1;
}
</style>
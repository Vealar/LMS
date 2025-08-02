export const BLOCK_TYPES = {
    THEORY: {
        id: "THEORY",
        label: "Теория",
    },
    TASK: {
        id: "TASK",
        label: "Задания",
    },
    TEST: {
        id: "TEST",
        label: "Тесты",
    },
}

export const BLOCK_TYPE_OPTIONS = Object.values(BLOCK_TYPES)

export function getBlockTypeFilterLabel(selectedTypes) {
    if (selectedTypes.length === 0) return "Ничего не выбрано"
    if (selectedTypes.length === BLOCK_TYPE_OPTIONS.length) return "Все"

    const labels = selectedTypes
        .map((id) => BLOCK_TYPES[id]?.label)
        .filter(Boolean)

    return labels.join(", ")
}

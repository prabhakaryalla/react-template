

export const initialiazeConfig = () => {
    return fetch('/config.json').then(response => {
        return response.json()
    })
}
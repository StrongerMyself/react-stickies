export default {
    stickerThemes: [
        { id: 1, title: 'Base',   colors: { thumb: '#000000', head: '#bbbbbb', body: '#ffffff' } },
        { id: 2, title: 'Yellow', colors: { thumb: '#e6d62d', head: '#fbd734', body: '#fff3be' } },
        { id: 3, title: 'Green',  colors: { thumb: '#2ba700', head: '#56d670', body: '#beffc8' } },
        { id: 4, title: 'Blue',   colors: { thumb: '#12bece', head: '#42bcf3', body: '#c7e4f5' } },
        { id: 5, title: 'Red',    colors: { thumb: '#ca3030', head: '#de5050', body: '#f5c7c7' } }
    ],
    boards: [
        {
            id: 1,
            title: 'New board ...',
            stickers: [
                { 
                    id: 1, 
                    themeId: 1,
                    top: 10, 
                    left: 10, 
                    text: ''
                },
            ]
        },
    ]
};

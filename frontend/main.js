import 'virtual:windi.css'

/* Adding event listeners to top level buttons */
document.getElementById('home-btn').addEventListener('click', () => {
    changeTabSelection(1)
})
document.getElementById('projects-btn').addEventListener('click', () => {
    changeTabSelection(2)
})
document.getElementById('blog-btn').addEventListener('click', () => {
    changeTabSelection(3)
})

/* Updates scrolling content upon menu button selection */
function changeTabSelection(val) {
    const home = document.getElementById('home-box')
    const projects = document.getElementById('projects-box')
    const blog = document.getElementById('blog-box')
    switch (val) {
        case 1:
            home.style.display = 'initial'
            projects.style.display = 'none'
            blog.style.display = 'none'
            break
        case 2:
            home.style.display = 'none'
            projects.style.display = 'initial'
            blog.style.display = 'none'
            break
        case 3:
            home.style.display = 'none'
            projects.style.display = 'none'
            blog.style.display = 'initial'
            break
    }
}

module.exports = { changeTabSelection }
let main = async(delay = 0) => {
    let iElem = document.querySelector('#pageInput')
    while (iElem.value !== '') {
        document.querySelector('.lpl-booklist-leftside-container.ng-scope').click()
        await new Promise(resolve => setTimeout(resolve, delay))
    }
    while (document.querySelector('.lpl-span-title.ng-binding').textContent !== iElem.value) {
        document.querySelector('.lpl-booklist-right-container.ng-scope').click()
        await new Promise(resolve => setTimeout(resolve, delay))
    }
    while (iElem.value !== '') {
        document.querySelector('.lpl-booklist-leftside-container.ng-scope').click()
        await new Promise(resolve => setTimeout(resolve, delay))
    }
    let res = await Array.from(document.querySelectorAll('iframe')).reduce(async(acc, curr) => {
        acc = await acc
        let resp = await fetch(curr.src)
        if (!resp.ok) return acc
        let str = await resp.text()
        let template = document.createElement('template')
        template.innerHTML = str
        let toAppend = Array.from(template.content.querySelectorAll('span')).map(elem => elem.textContent).join('')
        if (!toAppend) return acc
        acc.push(toAppend)
        return acc
    }, new Promise(resolve => resolve([])))
    return res?.join?.('\n') || ''
}
main(50).then(res => {
    console.log('Sucess.')
    console.log(res)
}).catch(err => {
    console.log('Error.')
    console.log(err)
})
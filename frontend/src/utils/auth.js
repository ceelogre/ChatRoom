export function reuireAuth(to, from, next){
    setTimeout(function(){
        console.log('.......')
    }, 4000)
    if(localStorage.uid){
        console.log('Ouuuu')
        next()
    }
    else{
        next({
            path: '/',

        })
        console.log('Ouuuu')
    }
}
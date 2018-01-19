// 使用 在 onLoad中初始化
// this.side = animate.slide(this);
//
module.exports =  {
    slide(context, styleName = 'styles') {
        let
            status = 'init',
            height = 0,
            self = context,
            //每个阶段变化都要刷新
            setStatus = function (id,_status,cb) {
                status = _status;
                self.setData({
                    [styleName]: Object.assign(self.data[styleName], {
                        [id]: ["transition: height .3s cubic-bezier(0.12, 0.4, 0.29, 1.46);",
                        status === 'init' && 'height:auto!important;' ||
                        status === 'expand' && `height:${height}px!important;` ||
                        status === 'shrink' && 'height:0px!important;'
                        ].join("")
                    })
                },cb);
            },
            expands = {};
            self.setData({
                [styleName]: {}
            });
        return {
            down(id) {
                console.log(context);
                setStatus(id,'init');
                var query = wx.createSelectorQuery();
                query.select(`#${id}`).boundingClientRect()
                query.exec(function (res) {
                    height = res[0].height;
                    //   拿到高度后,状态改变为shrink, 变为 shrink 后变为 expand
                    setStatus(id,'shrink',()=>setTimeout(()=>setStatus(id,'expand'),8));
                })
            },
            up(id) {
                setStatus(id,'shrink');
            },
            toggle(id){
                expands[id] = !expands[id];
                expands[id] ? this.down(id) : this.up(id);
            }
        }
    }
}
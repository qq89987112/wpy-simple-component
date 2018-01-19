// 使用 在 onLoad中初始化
// this.side = animate.slide(this);
// 小程序动画  height必须为0
module.exports =  {
    slide(context, styleName = 'styles',animations='animations') {
        let
            status = 'init',
            height = 0,
            self = context,
            animation = wx.createAnimation({
                duration:300,
                timingFunction:'cubic-bezier(0.12, 0.4, 0.29, 1.46)'
            }),
            //每个阶段变化都要刷新
            setStatus = function (id,_status,cb) {
                status = _status;
                switch (status){
                    case 'reset':
                        var an = wx.createAnimation({
                            duration: 0,
                            timingFunction: 'ease',
                        })
                        an.height(0).step()
                        context.setData({
                            animationData:an.export()
                        })
                        break
                    case 'expand':
                         animation.height(height).step()
                         context.setData({
                             animationData:animation.export()
                         })
                        break;
                    case 'shrink':
                        animation.height(0).step()
                        context.setData({
                            animationData:animation.export()
                        })
                        break;
                }

            },
            expands = {},
            heights = {};
            self.setData({
                [styleName]: {},
                [animations]:{}
            });
        return {
            down(id) {
                var query = wx.createSelectorQuery();
                query.select(`#${id}`).boundingClientRect()
                query.exec(function (res) {
                    height = heights[id] || res[0].height || 0;
                    setStatus(id,'reset');
                    setTimeout(()=>{
                        setStatus(id,'expand');

                    //    这个正好达到了firstDown的效果  6正好是阀值,8好一点
                    }, heights[id] ? 0 : 8)

                    heights[id] = height;
                })
            },
            up(id) {
                setStatus(id,'shrink');
            },
            toggle(id){
                expands[id] = !expands[id];
                expands[id] ? this.down(id) : this.up(id);
            },
            isExpand(id){
                return expands[id];
            }
        }
    }
}
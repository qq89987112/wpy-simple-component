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
                duration:0.3,
                timingFunction:'cubic-bezier(0.12, 0.4, 0.29, 1.46)'
            }),
            //每个阶段变化都要刷新
            setStatus = function (id,_status,cb) {
                status = _status;
                switch (status){
                    case 'init':
                        self.setData({
                            [styleName]: Object.assign(self.data[styleName], {
                                [id]: 'height:auto!important;'
                            })
                        },cb);
                        break
                    case 'reset':
                        // 小程序动画  height必须为0
                        self.setData({
                            [styleName]: Object.assign(self.data[styleName], {
                                [id]: 'height:0!important;'
                            })
                        },cb);
                        break;
                    case 'expand':
                        // animation.height(height).step();
                        // // self.setData(Object.assign(self.data[animations],{
                        // //     [id]:animation.export()
                        // // }))
                        // self.setData({animationData:animation.export()})

                         var animation = wx.createAnimation({
                             duration: 1000,
                             timingFunction: 'ease',
                             delay:2000
                         })
                         animation.height(50).step()
                         context.setData({
                             animationData:animation.export()
                         })
                        break;
                    case 'shrink':
                        // animation.height(0).step();
                        // self.setData(Object.assign(self.data[animations],{
                        //     [id]:animation.export()
                        // }))
                        var animation = wx.createAnimation({
                            duration: 1000,
                            timingFunction: 'ease',
                        })
                        animation.height(0).step()
                        context.setData({
                            animationData:animation.export()
                        })
                        break;
                }

            },
            expands = {};
            self.setData({
                [styleName]: {},
                [animations]:{}
            });
        return {
            down(id) {
                console.log(context);
                var query = wx.createSelectorQuery();
                setStatus(id,'init');
                query.select(`#${id}`).boundingClientRect()
                query.exec(function (res) {
                    height = res[0].height;
                    // 啥都不做，没有动画，因为一开始是auto动画不能做，必须一开始就是0。(无作为后面点击的有动画，设了style为height:auto,后面的没动画)
                    // .    story-list{
                    //         height: auto;
                    //     }

                    //所以先设为auto后再设为0，再次执行代码却没有动画(是因为不能刷新,init 和 reset都设为0可证明)。(后面点击的没有动画)

                    setStatus(id,'reset');
                    var animation = wx.createAnimation({
                        duration: 1000,
                        timingFunction: 'ease',
                    })
                    animation.height(50).step()
                    context.setData({
                        animationData:animation.export()
                    })


                })
            },
            up(id) {
                setStatus(id,'shrink');
            },
            toggle(id){
                expands[id] = !expands[id];
                expands[id] ? this.down(id) : this.up(id);
                // var animation = wx.createAnimation({
                //     duration: 1000,
                //     timingFunction: 'ease',
                // })
                // animation.scale(2,2).rotate(45).step()
                // context.setData({
                //     animationData:animation.export()
                // })

                // var animation = wx.createAnimation({
                //     duration: 1000,
                //     timingFunction: 'ease',
                //     delay:1
                // })
                // animation.height(50).step()
                // context.setData({
                //     animationData:animation.export()
                // })
            }
        }
    }
}

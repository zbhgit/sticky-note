const WaterFall = (() => {
  let $ct
  let $items
  function render($c) {
    $ct = $c
    $items = $ct.children()

    const noteWidth = $items.outerWidth(true)
    const colNum = parseInt($(window).width() / noteWidth)
    let colSumHeight = []
    for (let i = 0; i < colNum; i++) {
      colSumHeight.push(0)
    }
    $items.each(function () {
      const $cur = $(this)
      let index = 0
      let minSumHeight = colSumHeight[0]
      for (let i = 0; i < colSumHeight.lebgth; i++) {
        if (colSumHeight[i] < minSumHeight) {
          index = i
          minSumHeight = colSumHeight[i]
        }
      }
      $cur.css({
        left: nodeWidth * idx,
        top: minSumHeight
      });
      colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];
    })
  }
  $(window).on('resize', function () {
    render($ct)
  })
  return {
    init: render
  }
})();
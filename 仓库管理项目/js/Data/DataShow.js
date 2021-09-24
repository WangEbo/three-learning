
function DataShow(type,no) {
    this.type=type;
    this.no=no;
    this.colRowDistributionChart = null;
    this.RowDistributionChart = null;
}
DataShow.prototype.showHint=function(){
    let htmltext='';
    let dataAnalyze = new DataAnalyze(this.no);
   if(this.type=='StoreSign'||this.type=='Store')
   {
       let store= dataAnalyze.getStore(this.no);
       htmltext='<p>仓库编码：'+store.No +'</p>';
       htmltext+='<p>仓库名称：'+store.Name +'</p>';
       htmltext+='<p>总库存：'+dataAnalyze.getStoreTotalBin(this.no) +'</p>';
       htmltext+='<p>已占库存：'+dataAnalyze.getStoreOccurpyBin(this.no) +'</p>';
       htmltext+='<p>今日入库：'+dataAnalyze.getStoreTotalBin(this.no) +'</p>';
       htmltext+='<p>今日出库：'+dataAnalyze.getStoreOccurpyBin(this.no) +'</p>';
       htmltext+='<p1>提示：双击可查看详细信息</p1>';
   }
    else if(this.type=='StoreGroup')
    {
        let group= dataAnalyze.getGroup(this.no);
        htmltext='<p>编码：'+group.No +'</p>';
        htmltext+='<p>名称：'+group.Name +'</p>';
        htmltext+='<p>总库存：'+dataAnalyze.getGroupTotalBin(this.no) +'</p>';
        htmltext+='<p>已占库存：'+dataAnalyze.getGroupOccurpyBin(this.no) +'</p>';
        htmltext+='<p>今日入库：'+dataAnalyze.getGroupTotalBin(this.no) +'</p>';
        htmltext+='<p>今日出库：'+dataAnalyze.getGroupOccurpyBin(this.no) +'</p>';
        htmltext+='<p1>提示：双击可查看详细信息</p1>';
    }
    else if(this.type=='StoreGoods')
    {
        let bin= dataAnalyze.getBin(this.no);
        htmltext='<p>编码：'+bin.No +'</p>';
        htmltext+='<p>名称：'+bin.Name +'</p>';
        htmltext+='<p>条码号：'+bin.Barcode +'</p>';
        htmltext+='<p>状态：'+bin.State +'</p>';
    }
    return htmltext;
}








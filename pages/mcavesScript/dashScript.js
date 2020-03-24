var DashViewModel = function() {
    var self = this;
    self.newsArray = ko.observableArray([]);
    self.total_cases = ko.observable(5000);
    self.total_recovered = ko.observable(10);
    self.total_unresolved = ko.observable(20);
    self.total_deaths = ko.observable(30);
    self.total_new_cases_today = ko.observable(40);
    self.total_new_deaths_today = ko.observable(50);
    self.total_active_cases = ko.observable(60);
    self.total_serious_cases = ko.observable(70);

    

var events = {
    loadData : function(){
        $.ajax({
            url: 'https://thevirustracker.com/free-api?global=stats',
            dataType: 'json',
            success: function(data) {
              var data = data.results[0];
    
              self.total_cases(data.total_cases);
              self.total_recovered(data.total_recovered);
              self.total_unresolved(data.total_unresolved);
              self.total_deaths(data.total_deaths);
              self.total_new_cases_today(data.total_new_cases_today);
              self.total_new_deaths_today(data.total_new_deaths_today);
              self.total_active_cases(data.total_active_cases);
              self.total_serious_cases(data.total_serious_cases);
            }
          });
    },
    loadNews : function(){
        $.ajax({
            url: 'https://thevirustracker.com/free-api?countryTotal=np',
            dataType: 'json',
            success: function(data) {
              console.log(data);
              var dataToShow = [];
              $.each(data.countrynewsitems[0],function(i,x){
              
                    dataToShow.push({
                        newsid : x.newsid,
                        title : x.title,
                        image : x.image,
                        time : x.time,
                        url : x.url,
                    });
                
              });
              self.newsArray(dataToShow);
            }
          });
    }
}

events.loadData();
events.loadNews();
};
 


var obj = new DashViewModel();
$(document).ready(function(){
    ko.applyBindings(obj);

    
});


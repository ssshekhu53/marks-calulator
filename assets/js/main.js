var flag=true;
// var value=null;
var passingMarks=33.0;
function isNumKey(e){
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

$(document).on('submit', '#matric-marks-form', function(e){
    e.preventDefault();

    if(!flag)
        return;

    var fd=new FormData(this);

    if(parseFloat(fd.get('english'))<passingMarks)
        Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Pass certificate has not been awarded because you have scored less than passing marks English',
        }).then(() => {
            $('#matric-marks-form').trigger('reset');
        });
    else
    {
        var count=0;
        if(parseFloat(fd.get('hindi'))<passingMarks)
            count++;
        if(parseFloat(fd.get('mathematics'))<passingMarks)
            count++;
        if(parseFloat(fd.get('science'))<passingMarks)
            count++;
        if(parseFloat(fd.get('hcg'))<passingMarks)
            count++;
        if(parseFloat(fd.get('extra'))<passingMarks)
            count++;
        if(count>=2)
            Swal.fire({
                icon: 'error',
                title: 'Sorry',
                text: 'Pass certificate has not been awarded because you have scored less than passing marks in more than two papers.',
            }).then(() => {
                $('#matric-marks-form').trigger('reset');
            });
        else
        {
            var obj=[]
            for(var pair of fd.entries())
            {
                if(pair[0]!='english')
                obj.push({
                    subject: pair[0],
                    marks: parseFloat(pair[1]),
                });
            }

            obj.sort((a, b) => { return b.marks - a.marks; });

            var total=parseFloat(fd.get('english'))+obj[0].marks+obj[1].marks+obj[2].marks+obj[3].marks;
            var percentage=total/5;

            console.log(obj);

            Swal.fire({
                    icon: 'success',
                    title: 'Congo',
                    html: `You secured <strong>${percentage}% (${total} out of 500)</strong> in ENGLISH, ${obj[0].subject.toUpperCase()}, ${obj[1].subject.toUpperCase()}, ${obj[2].subject.toUpperCase()}, ${obj[3].subject.toUpperCase()}`,
                    backdrop: 'rgba(0, 0, 0, 0.5) url(party2.gif) repeat'
                }).then(() => {
                    $('#matric-marks-form').trigger('reset');
                }); 
        }            
    }
});
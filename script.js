var currentDept = 0;

// Unload warning
window.onbeforeunload = function() {
  return "כל הנתונים ייאבדו. האם ברצונץ להמשיך?";
};

$(document).ready(function() {
	// Hide elements
	$("#select-tech").hide();
	$("#select-gaming").hide();
	$("#final-article").hide();

	// Select department
	$("#dept-tech").click(function() {
		// Set current department to technology
		$("#dept-tech").removeClass("selectable").addClass("selected");
		$("#dept-gaming").removeClass("selected").addClass("selectable");
		$("#temp-select").hide();
		$("#select-gaming").hide();
		$("#select-tech").fadeIn("fast");
		currentDept = 1;
	});

	$("#dept-gaming").click(function() {
		// Set current department to gaming
		$("#dept-gaming").removeClass("selectable").addClass("selected");
		$("#dept-tech").removeClass("selected").addClass("selectable");
		$("#temp-select").hide();
		$("#select-tech").hide();
		$("#select-gaming").fadeIn("fast");
		currentDept = 2;
	});

	// Submit
	$("#submit-button").click(function() {
		$("#final-article").fadeIn("slow");

		if (currentDept == 1) {
			// Technology department
			$.get('template-techs.txt', generateArticle, "text");
		} else if (currentDept == 2) {
			// Gaming department
			$.get('template-gaming.txt', generateArticle, "text");
		} else {
			alert("אנא בחר מחלקה.");
			$("#final-article").hide();
		}
	});

	// Copy final article
	$("#final-article-copy").click(function() {
		var copied;

		document.getElementById("final-article-textarea").select();

		try {
			copied = document.execCommand('copy');
		} catch (ex) {
			copied = false;
		}

		if (copied) {
			var popup = document.getElementById("copy-popup");
    		popup.classList.toggle("show");
		} else {
			alert("לא הצלחנו להעתיק את הכתבה...");
		}
	});
});

function generateArticle(data) {
	var title = $("#title").val();
	var imgAddress = $("#img-address").val();
	var imgDesc = $("#img-desc").val();

	// Get department specific values
	if (currentDept == 1) {
		// Technology department
		forumID = $("#select-tech").val();
		forumName = $("#select-tech option[value='" + forumID + "']").text();
	} else if (currentDept == 2) {
		// Gaming department
		forumID = $("#select-gaming").val();
		forumName = $("#select-gaming option[value='" + forumID + "']").text();
	}

	var content = $("#content").val();
	var relevantLink = $("#relevant-link").val();
	var relevantLinkDesc = $("#relevant-link-desc").val();
	var source = $("#source").val();
	var link1 = $("#link-1").val();
	var link1Desc = $("#link-1-desc").val();
	var link2 = $("#link-2").val();
	var link2Desc = $("#link-2-desc").val();
	var link3 = $("#link-3").val();
	var link3Desc = $("#link-3-desc").val();
	var link4 = $("#link-4").val();
	var link4Desc = $("#link-4-desc").val();
	var link5 = $("#link-5").val();
	var link5Desc = $("#link-5-desc").val();

	// Remove empty lines from content
	content = content.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "");

	// Replace template with input values
	var newData = data.replace('%ArticleTitle%', title)
					  .replace('%ImageLink%', imgAddress)
					  .replace('%ImageLinkDesc%', imgDesc)
					  .replace('%Content%', content)
					  .replace('%RelevantLink%', relevantLink)
					  .replace('%RelevantLink%', relevantLink)
					  .replace('%RelevantLinkDesc%', relevantLinkDesc)
					  .replace('%Source%', source)
					  .replace('%ForumID%', forumID)
					  .replace('%ForumName%', forumName)
					  .replace('%AdditionalLink1%', link1)
					  .replace('%AdditionalLink1Desc%', link1Desc)
					  .replace('%AdditionalLink2%', link2)
					  .replace('%AdditionalLink2Desc%', link2Desc)
					  .replace('%AdditionalLink3%', link3)
					  .replace('%AdditionalLink3Desc%', link3Desc)
					  .replace('%AdditionalLink4%', link4)
					  .replace('%AdditionalLink4Desc%', link4Desc)
					  .replace('%AdditionalLink5%', link5)
					  .replace('%AdditionalLink5Desc%', link5Desc);

	// Update final article textarea
	$("#final-article-textarea").html(newData);
}
		<div data-role="header" id='header2' data-position='fixed'>
			<a href='#' id='close' class='ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext'>delete</a>
			<h2>header</h2>
			<a href='#' id='save' class='ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-action'>save</a>
			<div data-role='navbar'>
				<ul>
					<li><a href='#edit_detail' id='image_select'>image_select</a></li>
					<li><a href='#edit_detail' id='edge'>edge</a></li>
					<li><a href='#edit_detail' id='flip'>flip</a></li>
					<li><a href='#edit_detail' id='crop'>crop</a></li>
				</ul>
			</div>
			<!-- HeaderView  -->
		</div>
		<div role="main" id='main2' class="ui-content">
			<div id='canvas_div' style='position:relative'>
				<canvas id='canvas1' style='border:1px solid #1DDB16 ; position:absolute'></canvas>
				<canvas id='canvas2' style='border:1px solid #FF0000 ; position:absolute'></canvas>
				<canvas id='canvas3' style='border:1px solid #FF00DD ; position:absolute'></canvas>
			</div>
			<!-- SceneCompositeView -->
		</div>
		<div data-role="footer" id='footer2' data-position='fixed'>
			<!-- FooterView -->
			<h2>footer</h2>
		</div>

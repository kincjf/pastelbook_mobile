		<div data-role="header" id='header2' data-position='fixed'>
			<div data-role="controlgroup" data-type="horizontal" >
				<a href='javascript:void(0)' id='close' class='ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext'></a>
			    <a href='javascript:void(0)' data-role="button" data-icon="back" data-iconpos="notext"></a>
			    <a href='javascript:void(0)' data-role="button" data-icon="forward" data-iconpos="notext"></a>
			    <a href='javascript:void(0)' align="center" id='save' class='ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-action'></a>
			</div>	
			<div data-role='navbar'>
				<ul>
				<!--
					<li><button id='image_select' class="ui-btn ui-btn-d ui-btn-inline " >image_select</button></li>
					<li><button id='edge' class="ui-btn ui-btn-e ui-btn-inline " >edge</button></li>
					<li><button id='flip' class="ui-btn ui-btn-f ui-btn-inline " >flip</button></li>
					<li><button id='crop' class="ui-btn ui-btn-g ui-btn-inline " >crop</button></li>
				-->
					<li><a href='javascript:void(0)' id='image_select' class="ui-btn ui-btn-d ui-btn-inline">select</a></li>
					<li><a href='javascript:void(0)' id='edge' class="ui-btn ui-btn-e ui-btn-inline">edge</a></li>
					<li><a href='javascript:void(0)' id='flip' class="ui-btn ui-btn-f ui-btn-inline">flip</a></li>
					<li><a href='javascript:void(0)' id='crop' class="ui-btn ui-btn-g ui-btn-inline">crop</a></li>
					
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
			<h2>Pastel+</h2>
		</div>

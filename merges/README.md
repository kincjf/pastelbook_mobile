- referenced by http://docs.phonegap.com/en/edge/guide_cli_index.md.html#The%20Command-Line%20Interface

Using merges to Customize Each Platform

While Cordova allows you to easily deploy an app for many different platforms, sometimes you need to add customizations.

In that case, you don't want to modify the source files in various www directories within the top-level platforms directory, because they're regularly replaced with the top-level www directory's cross-platform source.

Instead, the top-level merges directory offers a place to specify assets to deploy on specific platforms.

Each platform-specific subdirectory within merges mirrors the directory structure of the www source tree, allowing you to override or add files as needed.

For example, here is how you might uses merges to boost the default font size for Android and Amazon Fire OS devices:

Edit the www/index.html file, adding a link to an additional CSS file, overrides.css in this case:

<link rel="stylesheet" type="text/css" href="css/overrides.css" />
Optionally create an empty www/css/overrides.css file, which would apply for all non-Android builds, preventing a missing-file error.

Create a css subdirectory within root/merges/android, then add a corresponding overrides.css file. Specify CSS that overrides the 12-point default font size specified within root/www/css/index.css, for example:

body { font-size:14px; }
When you rebuild the project, the Android version features the custom font size, while others remain unchanged.

You can also use merges to add files not present in the original www directory.

For example, an app can incorporate a back button graphic into the iOS interface, stored in merges/ios/img/back_button.png, while the Android version can instead capture backbutton events from the corresponding hardware button.


- referenced by http://photokandy.tumblr.com/post/47426024187/cordova-cli-simple-hooks-and-merges

Now there¡¯s a lot more you could do with this, but it is important to note that it only applies to the root/www directory.

So will you use the merges directory much? No, probably not. Nor should you, really.

Only use it in those situations where there¡¯s no other reasonably simple way and when you know what you¡¯re doing, because you¡¯re ultimately making the project more complicated.

For example, if I ever add anything extra to my index.html file, I have to do it in three places now, not just once.

But for the index.html file, that¡¯s a price I¡¯m willing to pay, since each platform expects one, and the only way to get a different one per platform is to use this method or edit the project¡¯s native code. I like this way better.


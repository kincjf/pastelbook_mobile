package org.sfl.MediaScannerPlugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

/**
 * MediaScannerPlugin.java
 *
 * Inspirated by Joseph's "Saving Image to Android device’s Gallery – Phonegap Android" plugin
 * https://jbkflex.wordpress.com/2012/12/23/saving-image-to-android-devices-gallery-phonegap-android/
 *
 * @author Peter Gao <peter@spacefluxlabs.com>
 */
public class MediaScannerPlugin extends CordovaPlugin {
    public static final String ACTION = "scanFile";
    private static final String TAG = "MediaScannerPlugin";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (action.equals(ACTION)) {
            /* Invoke the system's media scanner to add your photo to the Media Provider's database,
            * making it available in the Android Gallery application and to other apps. */
            //cordova.getActivity().sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse("file:///mnt/sdcard"))); 

            //callbackContext.success();

            //return true;
        	try {
                String absolutePath = args.getString(0);
                if (absolutePath.startsWith("data:image")) {
                    absolutePath = absolutePath.substring(absolutePath.indexOf(',') + 1);
                }

                return this.mediaScanner(absolutePath, callbackContext);

            } catch (JSONException e) {
                e.printStackTrace();
                callbackContext.error(e.getMessage());
                return false;
            } catch (InterruptedException e) {
                e.printStackTrace();
                callbackContext.error(e.getMessage());
                return false;
            }
        } else {
            Log.w(TAG, "Wrong action was provided: "+action);
            return false;
        }
    }
    
    private boolean mediaScanner(String absolutePath, CallbackContext callbackContext) throws InterruptedException, JSONException
    {
          Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
          //File f = new File(filename);

          Uri contentUri = Uri.parse(absolutePath.toString());
          mediaScanIntent.setData(contentUri);
          System.out.println("from internal?" + contentUri);
          //this.cordova.getContext().sendBroadcast(mediaScanIntent); //this is deprecated
          this.cordova.getActivity().sendBroadcast(mediaScanIntent);
          return true;
    }
}

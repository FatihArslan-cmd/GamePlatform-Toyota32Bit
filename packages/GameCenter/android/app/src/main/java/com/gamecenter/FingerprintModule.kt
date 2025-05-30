package com.gamecenter;

import android.content.Context;
import android.os.Build;
import androidx.annotation.RequiresApi;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import com.facebook.react.bridge.*;
import com.facebook.react.ReactActivity;
import java.util.concurrent.Executor;

class FingerprintModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private lateinit var biometricPrompt: BiometricPrompt;
    private lateinit var executor: Executor;

    override fun getName(): String {
        return "FingerprintModule";
    }

    @RequiresApi(Build.VERSION_CODES.P)
    @ReactMethod
    fun authenticateFingerPrint(callback: Callback) {
        try {
            val biometricManager = BiometricManager.from(reactApplicationContext)
            when (biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG or BiometricManager.Authenticators.DEVICE_CREDENTIAL)) {
                BiometricManager.BIOMETRIC_SUCCESS -> {
                    executor = ContextCompat.getMainExecutor(reactApplicationContext)
                    val activity = currentActivity as? ReactActivity
                    if (activity != null) {
                        reactApplicationContext.runOnUiQueueThread {
                            biometricPrompt = BiometricPrompt(activity, executor, object : BiometricPrompt.AuthenticationCallback() {
                                override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                                    callback.invoke("Error: $errString")
                                }
    
                                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                                    callback.invoke("Success")
                                }
    
                                override fun onAuthenticationFailed() {
                                    callback.invoke("Authentication failed.")
                                }
                            })
    
                            val promptInfoBuilder = BiometricPrompt.PromptInfo.Builder()
                                .setTitle("Authentication Required")
                                .setSubtitle("Authenticate using your fingerprint or device credential")
    
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                                promptInfoBuilder.setDeviceCredentialAllowed(true)
                            } else {
                                promptInfoBuilder.setNegativeButtonText("Cancel")
                            }
    
                            val promptInfo = promptInfoBuilder.build()
    
                            biometricPrompt.authenticate(promptInfo)
                        }
                    } else {
                        callback.invoke("Activity is not a ReactActivity")
                    }
                }
                BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE -> callback.invoke("No biometric hardware available.")
                BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE -> callback.invoke("Biometric hardware is currently unavailable.")
                BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> callback.invoke("No fingerprints or device credentials enrolled.")
                else -> callback.invoke("Biometric authentication is not available.")
            }
        } catch (e: Exception) {
            callback.invoke("An unexpected error occurred: ${e.message}")
        }
    }
    
}

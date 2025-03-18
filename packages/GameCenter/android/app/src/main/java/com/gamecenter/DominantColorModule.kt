package com.gamecenter;
import com.facebook.react.bridge.*;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap;
import android.graphics.Color;
import java.net.URL;
import java.io.FileInputStream;
import java.io.File;
import androidx.palette.graphics.Palette;
import android.util.LruCache;

class DominantColorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "DominantColor"

    private val memoryCache: LruCache<String, Bitmap>

    init {
        // Get max available VM memory, exceeding this value will throw OutOfMemory exception.
        val maxMemory = (Runtime.getRuntime().maxMemory() / 1024).toInt()

        // Use 1/8th of the available memory for this memory cache. Adjust fraction as needed.
        val cacheSize = maxMemory / 8

        memoryCache = object : LruCache<String, Bitmap>(cacheSize) {
            override fun sizeOf(key: String, bitmap: Bitmap): Int {
                // The cache size will be measured in kilobytes rather than number of items.
                return bitmap.byteCount / 1024
            }
        }
    }


    @ReactMethod
    fun getDominantColor(imagePath: String, promise: Promise) {
        try {
            // Check memory cache first
            val cachedBitmap = memoryCache.get(imagePath)
            if (cachedBitmap != null) {
                println("Bitmap retrieved from cache for: $imagePath") // Log cache hit
                val dominantColor = calculateDominantColor(cachedBitmap)
                val colorHexString = String.format("#%06X", (0xFFFFFF and dominantColor))
                promise.resolve(colorHexString)
                return // Early return from cache
            }

            val bitmap = loadImage(imagePath) // Load image only if not in cache
            if (bitmap == null) {
                promise.reject("IMAGE_LOAD_ERROR", "Resim yüklenemedi: $imagePath")
                return
            }

            val dominantColor = calculateDominantColor(bitmap)
            val colorHexString = String.format("#%06X", (0xFFFFFF and dominantColor))
            promise.resolve(colorHexString)

            // Cache the bitmap for future use (cache only for URLs for now, you can extend to local files if needed)
            if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
                memoryCache.put(imagePath, bitmap)
                println("Bitmap cached for: $imagePath") // Log cache put
            }


        } catch (e: Exception) {
            promise.reject("DOMINANT_COLOR_ERROR", "Baskın renk hesaplanırken hata oluştu: ${e.message}", e)
        }
    }

    private fun loadImage(imagePath: String): Bitmap? {
        return try {
            val inputStream = when {
                imagePath.startsWith("http://") || imagePath.startsWith("https://") -> {
                    URL(imagePath).openConnection().apply {
                        connectTimeout = 5000
                        readTimeout = 5000
                    }.getInputStream()
                }
                else -> FileInputStream(File(imagePath))
            }

            val options = BitmapFactory.Options().apply {
                inJustDecodeBounds = true
            }
            BitmapFactory.decodeStream(inputStream, null, options)
            inputStream.close()

            options.inSampleSize = calculateInSampleSize(options, 100, 100)
            options.inJustDecodeBounds = false

            val newInputStream = when {
                imagePath.startsWith("http://") || imagePath.startsWith("https://") ->
                    URL(imagePath).openStream()
                else -> FileInputStream(File(imagePath))
            }

            return BitmapFactory.decodeStream(newInputStream, null, options).also {
                newInputStream.close()
            }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    private fun calculateInSampleSize(options: BitmapFactory.Options, reqWidth: Int, reqHeight: Int): Int {
        val (height: Int, width: Int) = options.run { outHeight to outWidth }
        var inSampleSize = 1

        if (height > reqHeight || width > reqWidth) {
            val halfHeight = height / 2
            val halfWidth = width / 2

            while (halfHeight / inSampleSize >= reqHeight && halfWidth / inSampleSize >= reqWidth) {
                inSampleSize *= 2
            }
        }
        return inSampleSize
    }

    private fun calculateDominantColor(bitmap: Bitmap): Int {
        return try {
            val palette = Palette.from(bitmap)
                .maximumColorCount(8)
                .generate()
            palette.dominantSwatch?.rgb ?: Color.BLACK
        } catch (e: Exception) {
            Color.BLACK
        }
    }
}